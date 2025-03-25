import { getAllTemplates } from '@/template/queries/template_query'

const Templates = async () => {
  const templates = await getAllTemplates()
  if (templates?.length === 0) return <p>No templates found</p>


  return (
    <ul>
      {templates && templates.map((template) => (
        <li key={template.id}>{template.name}</li>
      ))
      }
    </ul>
  )
}

export default Templates