import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
    id: string;
    title: string;
}

const Task: React.FC<TaskProps> = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-2 bg-white rounded shadow-md cursor-pointer"
            {...attributes}
            {...listeners}
        >
            {title}
        </div>
    );
};

export default Task;
