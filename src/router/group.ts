import { Composer } from 'grammy'
import { MyContext } from '..'
import Group from '../models/Group'

export const group = new Composer<MyContext>()

group.on('my_chat_member:from', async ctx => {
  let admins
  if (ctx.myChatMember.new_chat_member.status === 'administrator') {
    admins = await ctx.getChatAdministrators()
  }
  await Group.updateOne(
    { id: ctx.chat.id },
    {
      id: ctx.chat.id,
      admins,
      myStatus: ctx.myChatMember.new_chat_member.status,
    },
    { upsert: true }
  )
})

group.use(async (ctx, next) => {
  const group = await Group.findOne({ id: ctx.chat?.id })
  if (!group) {
    return
  }
  if (group.myStatus !== 'administrator') {
    return
  }
  const admin = group.admins.find(
    admin => ctx.message?.from.id === admin.user.id
  )
  if (!admin) {
    return
  }
  next()
})
group.on('chat_member', async ctx => {
  if (ctx.chatMember.new_chat_member.status === 'administrator') {
    await Group.updateOne(
      { id: ctx.chat.id },
      {
        $addToSet: {
          admins: ctx.chatMember.new_chat_member,
        },
      }
    )
  }
  if (
    ctx.chatMember.old_chat_member.status === 'administrator' &&
    ctx.chatMember.new_chat_member.status !== 'administrator' &&
    ctx.chatMember.new_chat_member.status !== 'creator'
  ) {
    await Group.updateOne(
      { id: ctx.chat.id },
      {
        $pull: {
          admins: {
            $elemMatch: { 'user.id': ctx.chatMember.old_chat_member.user.id },
          },
        },
      }
    )
  }
})
group.on('msg:forward_date', ctx => {
  ctx.deleteMessage()
})
group.on('::url', ctx => {
  ctx.deleteMessage()
})
group.on([':entities:url', ':entities:text_link'], ctx => {
  ctx.deleteMessage()
})
