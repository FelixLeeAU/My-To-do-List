'use client'

import { useState } from 'react'
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions'

interface Todo {
    id: string
    text: string
    type: string
    completed: boolean
}

interface TodoListProps {
    initialTodos: Todo[]
}

const TASK_TYPES = ['Personal', 'Work'] as const

export default function TodoList({ initialTodos }: TodoListProps) {
    const [inputText, setInputText] = useState('')
    const [selectedType, setSelectedType] = useState<string>('Personal')
    const [isAdding, setIsAdding] = useState(false)

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputText.trim() || isAdding) return

        setIsAdding(true)
        await addTodo(inputText, selectedType)
        setInputText('')
        setIsAdding(false)
    }

    return (
        <div>
            {/* 输入区域 */}
            <form onSubmit={handleAdd} className="flex flex-col gap-3 mb-8">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter a new task..."
                        className="flex-1 px-4 py-3 text-lg border-2 border-[#e5e5e7] rounded-xl focus:outline-none focus:border-[#007aff] transition-colors"
                        disabled={isAdding}
                    />
                    <button
                        type="submit"
                        disabled={isAdding}
                        className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-br from-[#007aff] to-[#0066cc] rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {isAdding ? 'Adding...' : 'Add'}
                    </button>
                </div>
                {/* 类型选择器 */}
                <div className="flex gap-2">
                    {TASK_TYPES.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedType === type
                                    ? type === 'Work'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </form>

            {/* 任务列表 */}
            <ul className="space-y-3">
                {initialTodos.length === 0 ? (
                    <li className="text-center py-10 text-gray-500">
                        📝 No tasks yet. Add one!
                    </li>
                ) : (
                    initialTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex items-center gap-4 p-4 rounded-xl bg-[#fafafa] task-item-shadow ${todo.completed ? 'opacity-60 bg-[#f0f0f2]' : ''
                                }`}
                        >
                            {/* 类型标签 */}
                            <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${todo.type === 'Work'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                            >
                                {todo.type}
                            </span>
                            <span
                                className={`flex-1 text-lg transition-all ${todo.completed ? 'line-through text-gray-500' : 'text-[#1d1d1f]'
                                    }`}
                            >
                                {todo.text}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleTodo(todo.id, !todo.completed)}
                                    className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-md ${todo.completed
                                        ? 'bg-gray-500 hover:bg-gray-600'
                                        : 'bg-gradient-to-br from-[#34c759] to-[#30b350]'
                                        }`}
                                >
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="px-4 py-2 text-sm font-semibold text-[#ff3b30] border-2 border-[#ff3b30] rounded-lg hover:bg-[#ff3b30] hover:text-white transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
