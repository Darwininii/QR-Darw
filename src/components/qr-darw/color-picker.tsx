"use client";

import { HexColorPicker } from 'react-colorful';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-start text-left font-normal')}
            aria-label={`Pick ${label} color`}
          >
            <div className="flex w-full items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1 truncate">{color.toUpperCase()}</div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border p-2">
          <HexColorPicker color={color} onChange={onChange} />
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2"
            aria-label="Color hex value"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
