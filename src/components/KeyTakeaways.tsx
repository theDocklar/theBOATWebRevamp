import { Check } from "lucide-react";

interface KeyTakeawaysProps {
  items: string[];
  title?: string;
}

export default function KeyTakeaways({ items, title = "Key takeaways" }: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-[#0f0f0f] rounded-2xl p-7 md:p-9 my-10">
      <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
        {title}
      </p>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#f04b25]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} className="text-[#f04b25]" />
            </span>
            <span className="text-[15px] text-white/80 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
