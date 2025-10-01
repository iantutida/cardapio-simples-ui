import { OrderStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    RECEBIDO: { label: 'Recebido', color: 'bg-status-pending text-white' },
    EM_PREPARO: { label: 'Em Preparo', color: 'bg-status-preparing text-white' },
    PRONTO: { label: 'Pronto', color: 'bg-status-ready text-white' },
    ENTREGUE: { label: 'Entregue', color: 'bg-status-delivered text-white' },
    CANCELADO: { label: 'Cancelado', color: 'bg-status-cancelled text-white' },
  };

  const config = statusConfig[status];

  return (
    <Badge className={cn(config.color, className)}>
      {config.label}
    </Badge>
  );
}
