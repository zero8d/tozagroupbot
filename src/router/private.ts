import { Composer, InlineKeyboard } from 'grammy'
import { MyContext } from '..'

export const privateChat = new Composer<MyContext>()

privateChat.command('start', ctx => {
  ctx.session.first_name = ctx.message?.from.first_name
  ctx.session.username = ctx.message?.from.username
  ctx.session.state = 'start'
  const inlineKeyboard = new InlineKeyboard()
  inlineKeyboard.url(
    "Guruhga qo'shing",
    'https://t.me/' + ctx.me.username + '?startgroup=true'
  )
  ctx.reply(
    "Men guruhlarni har xil reklamalardan tozalayman. Meni guruhingizga qo'shing",
    {
      reply_markup: inlineKeyboard,
    }
  )
})
