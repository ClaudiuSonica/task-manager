import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    DragEndEvent,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import Column from "../Column/Column.tsx";

interface Task {
    id: string;
    title: string;
}

interface ColumnType {
    id: string;
    name: string;
    tasks: Task[];
}

const initialColumns: ColumnType[] = [
    {
        id: 'column-1',
        name: 'To Do',
        tasks: [
            { id: 'task-1', title: 'Task 1' },
            { id: 'task-2', title: 'Task 2' },
        ],
    },
    {
        id: 'column-2',
        name: 'In Progress',
        tasks: [{ id: 'task-3', title: 'Task 3' }],
    },
    {
        id: 'column-3',
        name: 'Done',
        tasks: [{ id: 'task-4', title: 'Task 4' }],
    },
];

const Board: React.FC = () => {
    const [columns, setColumns] = useState(initialColumns);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return; // No drop target

        // Find the source and destination columns
        const sourceColumn = columns.find((col) =>
            col.tasks.find((task) => task.id === active.id)
        );
        const destinationColumn = columns.find((col) => col.id === over.id);

        if (sourceColumn && destinationColumn) {
            const sourceIndex = sourceColumn.tasks.findIndex(
                (task) => task.id === active.id
            );

            if (sourceColumn.id === destinationColumn.id) {
                // Sort within the same column
                const destinationIndex = destinationColumn.tasks.findIndex(
                    (task) => task.id === over.id
                );

                const updatedTasks = arrayMove(
                    sourceColumn.tasks,
                    sourceIndex,
                    destinationIndex
                );

                setColumns((prevColumns) =>
                    prevColumns.map((col) =>
                        col.id === sourceColumn.id
                            ? { ...col, tasks: updatedTasks }
                            : col
                    )
                );
            } else {
                // Move task to a different column
                const draggedTask = sourceColumn.tasks[sourceIndex];
                const updatedSourceTasks = sourceColumn.tasks.filter(
                    (task) => task.id !== active.id
                );

                const updatedDestinationTasks = [
                    ...destinationColumn.tasks,
                    draggedTask,
                ];

                setColumns((prevColumns) =>
                    prevColumns.map((col) => {
                        if (col.id === sourceColumn.id) {
                            return { ...col, tasks: updatedSourceTasks };
                        } else if (col.id === destinationColumn.id) {
                            return { ...col, tasks: updatedDestinationTasks };
                        }
                        return col;
                    })
                );
            }
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="flex space-x-4">
                <SortableContext
                    items={columns.map((col) => col.id)}
                    strategy={rectSortingStrategy}
                >
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            name={column.name}
                            tasks={column.tasks}
                        />
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default Board;
