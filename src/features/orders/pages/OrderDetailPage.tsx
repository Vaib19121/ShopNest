import { useParams } from 'react-router-dom'

export default function OrderDetailPage() {
  const { id } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Order Detail</h1>
        <p className="text-muted-foreground">Order ID: {id} — coming soon</p>
      </div>
    </div>
  )
}
