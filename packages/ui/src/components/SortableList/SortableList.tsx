'use client';

import React, { useId } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface BaseItem {
  id: string | number;
}

interface SortableListProps<T extends BaseItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (
    item: T,
    args: { dragHandleProps: any; isDragging: boolean }
  ) => React.ReactNode;
}

export function SortableList<T extends BaseItem>({
  items,
  onReorder,
  renderItem,
}: SortableListProps<T>) {
  const id = useId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {({ attributes, listeners, isDragging }) =>
                renderItem(item, {
                  dragHandleProps: { ...attributes, ...listeners },
                  isDragging,
                })
              }
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
