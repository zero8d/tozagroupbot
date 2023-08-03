import { Router } from '@grammyjs/router'
import { MyContext } from '..'
import Group from '../models/Group'
import { group } from './group'
import { privateChat } from './private'

export const router = new Router<MyContext>(ctx => ctx.chat?.type)

router.route('group', group)
router.route('supergroup', group)
router.route('private', privateChat)
