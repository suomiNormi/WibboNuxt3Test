import type { User } from '~~/src/types'

export const useAuthUser = () => useState<User>('user', () => DEFAULT_USER)

export const DEFAULT_USER: User = {
  id: -1,
  username: '',
  motto: '',
  look: 'fa-1201-1408.sh-295-110.cc-3827-1263-1230.he-3082-63.hr-3871-61.ea-1402-73.hd-180-2.ch-3368-110-1408.ca-3177-110-73.lg-3596-110-1408.wa-5238-1330',
  vip_points: 0,
  limit_coins: 0,
  rank: 1
}
