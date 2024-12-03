import React from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Task from "../Task/Task.tsx";

interface ColumnProps {
    id: string;
    name: string;
    tasks: { id: string; title: string }[];
}

const Column: React.FC<ColumnProps> = ({ name, tasks }) => {
    return (
        <div className="bg-gray-200 p-4 w-1/3 rounded">
            <h3 className="text-lg font-bold mb-4">{name}</h3>
            <SortableContext items={tasks.map((task) => task.id)} strategy={rectSortingStrategy}>
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.title} />
                ))}
            </SortableContext>
        </div>
    );
};

export default Column;
