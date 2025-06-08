// utils/pdfExport.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  data: any[],
  title: string = "Data Mahasiswa Beasiswa"
) => {
  const doc = new jsPDF();

  doc.setFont("helvetica");
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 22);

  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Tanggal: ${currentDate}`, 14, 30);

  const tableData = data.map((item, index) => [
    index + 1,
    item.nim,
    item.user.namaLengkap,
    item.jurusan,
    item.ipk.toString(),
    item.prestasi.toString(),
    item.verifikasi === "BERHASIL"
      ? "Lulus"
      : item.verifikasi === "GAGAL"
      ? "Tidak Lulus"
      : "Diproses",
  ]);

  autoTable(doc, {
    head: [["No", "NIM", "Nama", "Jurusan", "IPK", "Prestasi", "Status"]],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 15, halign: "center" },
      1: { cellWidth: 25, halign: "center" },
      2: { cellWidth: 40 },
      3: { cellWidth: 30 },
      4: { cellWidth: 20, halign: "center" },
      5: { cellWidth: 20, halign: "center" },
      6: { cellWidth: 30, halign: "center" },
    },
    margin: { top: 40, left: 14, right: 14 },
    didDrawPage: (data: any) => {
      const pageCount = (doc as any).internal.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height || pageSize.getHeight();

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Halaman ${data.pageNumber} dari ${pageCount}`,
        pageSize.width - 40,
        pageHeight - 10
      );
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 100;

  const totalMahasiswa = data.length;
  const mahasiswaLulus = data.filter(
    (item) => item.verifikasi === "BERHASIL"
  ).length;
  const mahasiswaTidakLulus = data.filter(
    (item) => item.verifikasi === "GAGAL"
  ).length;
  const mahasiswaDiproses = data.filter(
    (item) => item.verifikasi === "DIPROSES"
  ).length;

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text("Ringkasan:", 14, finalY + 20);

  doc.setFontSize(10);
  doc.text(`Total Mahasiswa: ${totalMahasiswa}`, 14, finalY + 30);
  doc.text(`Lulus: ${mahasiswaLulus}`, 14, finalY + 40);
  doc.text(`Tidak Lulus: ${mahasiswaTidakLulus}`, 14, finalY + 50);
  doc.text(`Sedang Diproses: ${mahasiswaDiproses}`, 14, finalY + 60);

  const fileName = `data_mahasiswa_beasiswa_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  doc.save(fileName);
};

export const exportFilteredToPDF = (
  data: any[],
  filter: "all" | "lulus" | "tidak_lulus" | "diproses" = "all"
) => {
  let filteredData = data;
  let title = "Data Mahasiswa Beasiswa";

  switch (filter) {
    case "lulus":
      filteredData = data.filter((item) => item.verifikasi === "BERHASIL");
      title = "Data Mahasiswa Beasiswa - LULUS";
      break;
    case "tidak_lulus":
      filteredData = data.filter((item) => item.verifikasi === "GAGAL");
      title = "Data Mahasiswa Beasiswa - TIDAK LULUS";
      break;
    case "diproses":
      filteredData = data.filter((item) => item.verifikasi === "DIPROSES");
      title = "Data Mahasiswa Beasiswa - SEDANG DIPROSES";
      break;
    default:
      title = "Data Mahasiswa Beasiswa - SEMUA DATA";
  }

  exportToPDF(filteredData, title);
};
