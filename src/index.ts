import { ISession, MongoDBAdapter } from '@grammyjs/storage-mongodb'
import { Bot, Context, InlineKeyboard, session, SessionFlavor } from 'grammy'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { botToken, mongoConnString } from './config'
dotenv.config()

interface SessionData {
  first_name?: string
  username?: string
  state: string
  chattype: 'private' | 'group' | 'supergroup' | 'channel'
}

export type MyContext = Context & SessionFlavor<SessionData>

const bot = new Bot<MyContext>(botToken)
function initial(): SessionData {
  return { state: 'start', chattype: 'private' }
}
const main = async () => {
  await mongoose.connect(mongoConnString)

  const collection = mongoose.connection.db.collection<ISession>('sessions')
  bot.use(session({ initial, storage: new MongoDBAdapter({ collection }) }))
  bot.command('start', ctx => {
    const inlineKeyboard = new InlineKeyboard()
    inlineKeyboard.url(
      "Guruhga qo'shing",
      'https://t.me/' + ctx.me.username + '?startgroup=true'
    )
    if (ctx.chat.type !== 'private') {
      ctx.reply(
        "Men guruhlarni tozalayman. To'gri ishlashim uchun meni admin qiling",
        {
          reply_markup: inlineKeyboard,
        }
      )
      return
    }
    ctx.reply('Bu bot guruhlarni har xil reklamalardan tozalaydi.', {
      reply_markup: inlineKeyboard,
    })
  })

  bot.start({
    onStart: () =>
      console.log('@' + bot.botInfo.username + ' has been started'),
  })
}

main()
