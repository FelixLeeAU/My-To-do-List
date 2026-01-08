'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function getTodos() {
    try {
        return await prisma.todo.findMany({
            where: {
                deletedAt: null,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    } catch (error) {
        console.error('Error fetching todos:', error)
        return []
    }
}

export async function addTodo(text: string) {
    if (!text.trim()) return

    try {
        await prisma.todo.create({
            data: {
                text,
            },
        })
        revalidatePath('/')
    } catch (error) {
        console.error('Error adding todo:', error)
    }
}

export async function toggleTodo(id: string, completed: boolean) {
    try {
        await prisma.todo.update({
            where: { id },
            data: { completed },
        })
        revalidatePath('/')
    } catch (error) {
        console.error('Error toggling todo:', error)
    }
}

export async function deleteTodo(id: string) {
    try {
        // 软删除：更新 deletedAt 字段
        await prisma.todo.update({
            where: { id },
            data: { deletedAt: new Date() },
        })
        revalidatePath('/')
    } catch (error) {
        console.error('Error deleting todo:', error)
    }
}
