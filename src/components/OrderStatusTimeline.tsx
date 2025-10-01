import { OrderStatus } from '@/types';
import { CheckCircle2, Circle, Clock, Package, Truck, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
}

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  const statuses = [
    { key: 'RECEBIDO', label: 'Recebido', icon: Clock },
    { key: 'EM_PREPARO', label: 'Em Preparo', icon: Package },
    { key: 'PRONTO', label: 'Pronto', icon: CheckCircle2 },
    { key: 'ENTREGUE', label: 'Entregue', icon: Truck }
  ];

  const getCurrentIndex = (status: OrderStatus) => {
    if (status === 'CANCELADO') return -1;
    return statuses.findIndex(s => s.key === status);
  };

  const currentIndex = getCurrentIndex(currentStatus);
  const isCancelled = currentStatus === 'CANCELADO';

  if (isCancelled) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <XCircle className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-lg font-semibold text-destructive">Pedido Cancelado</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-muted -z-10" />
        <div
          className="absolute top-8 left-0 h-1 bg-primary transition-all duration-500 -z-10"
          style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
        />

        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={status.key} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full border-4 bg-background transition-colors",
                  isCompleted
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
                )}
              >
                <Icon className={cn("h-7 w-7", isCurrent && "animate-pulse")} />
              </div>
              <p
                className={cn(
                  "mt-3 text-sm font-medium text-center",
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {status.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
