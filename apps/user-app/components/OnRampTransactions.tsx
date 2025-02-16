import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date
    amount: number
    status: string
    provider: string
  }[]
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">No Recent transactions</div>
      </Card>
    )
  }
  return (
    <Card title="Recent Transactions">
      <div className="space-y-4 pt-2">
        {transactions.map((t, index) => (
          <div key={`${t.time.toISOString()}-${index}`} className="flex justify-between">
            <div>
            <div className={`${t.status === "Success" ? "text-green-500 " : "text-red-500"}`}>{t.status}</div>
              <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
            </div>
            <div className="flex flex-col justify-center">+ Rs {t.amount / 100}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}