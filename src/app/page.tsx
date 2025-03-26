import HomeWrapper from "@/components/features/home/HomeWrapper";
import WithUser from "@/components/shared/WithUser";

export default function Home() {

  return (
    <div className="container">
      <WithUser>
        {(user) => (
          <HomeWrapper user={user} />
        )}
      </WithUser>
    </div>
  );
}
