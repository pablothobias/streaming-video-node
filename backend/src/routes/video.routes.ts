import { Router } from 'express'

import { streamVideo } from '../controllers/video.controller'
import getVideoUrl from '../services/cdn.service'

const router = Router()

router.get('/:key/stream', streamVideo)
router.get('/:key/url', getVideoUrl)

export default router
