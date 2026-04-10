import { memo } from 'react'
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri'

const StatsCard = memo(({ icon: IconComponent, label, value, trend = null, description = null }) => {
  return (
    <article className='rounded-[18px] border border-[rgba(97,60,44,0.2)] bg-[rgba(255,248,238,0.8)] p-4'>
      {/* Icon & Label */}
      <div className='flex items-center justify-between'>
        <p className='text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#8d4a2f]'>
          {label}
        </p>
        {IconComponent && <IconComponent size={24} className='text-[#bf5b33]' />}
      </div>

      {/* Value */}
      <h2 className='text-3xl font-semibold mt-3'>{value}</h2>

      {/* Trend/Description */}
      {trend && (
        <p className={`mt-2 text-sm font-medium flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? <RiArrowUpLine size={16} /> : <RiArrowDownLine size={16} />} {trend.text}
        </p>
      )}

      {description && (
        <p className='mt-2 text-[0.8rem] text-[#73544a]'>{description}</p>
      )}
    </article>
  )
})

StatsCard.displayName = 'StatsCard'

export default StatsCard
