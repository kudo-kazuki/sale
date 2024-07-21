import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return format(date, 'yyyy年M月d日', { locale: ja })
}
