import { getTodos } from './actions'
import TodoList from '@/components/TodoList'

export default async function Home() {
  const initialTodos = await getTodos()

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto glass-card p-8">
        <h1 className="text-3xl font-bold text-center mb-8 page-title">
          My TO-DO List
        </h1>

        <TodoList initialTodos={initialTodos} />
      </div>
    </main>
  )
}
