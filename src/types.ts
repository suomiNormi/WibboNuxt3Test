export interface User {
    id: number
    username: string
    motto: string
    online: number
    look: string
    vip_points: number
    account_created: number
    last_offline: number
    limit_coins: number
    rank: number
    mail?: string
    block_newfriends?: number
    hide_online?: number
    hide_inroom?: number
    accept_trading?: number
    hide_profil?: number
    mazo?: number
    mazoscore?: number
    run_points_month?: number
    run_points?: number
    game_points_month?: number
    game_points?: number
    achievement_score?: number
    online_time?: number
    mois_vip?: number
    respect?: number
}

export interface NitroLegacy {
    method: string
    params: string[]
}

export interface Cloud {
    top: number
    left: number
    small: boolean
    blur: number
}

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>

    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
    }>

    prompt(): Promise<void>
}

export interface NotificationAlert {
    message: string
    type: string
    duration?: number
    callback?: Function
    translate?: boolean
    params?: string[]
}

export interface Forum {
    id: number
    title: string
    lastpost_author: string
    lastpost_date: number
    look: string
}

export interface Article {
    author: string
    author_id: number
    body: string
    category_id: number
    id: number
    link_keyword: string
    look: string
    snippet: string
    timestamp: number
    title: string
    topstory_image: string
    username: string
}

export interface Photo {
    photo: string
    username: string
    look: string
    time: number
}

export interface Rare {
    id: number
    catalog_name: string
    amount: number
    rarity_level: number
}

export interface Staff {
    id: number
    rank: number
    function: string
    username: string
    look: string
    online: number
}

export interface ICategory {
    id: number
    name: string
    denyCreate?: boolean
}

export interface Post {
    id: number
    title: string
    statut: number
    author: string
    date: number
    lastpost_author: string
    lastpost_date: number
    posts: number
    views: number
    type: number
}

export interface Sujet {
    id: number
    type: number
    categorie: number
    title: string
    statut: number
    author: string
    date: number
    lastpost_author: string
    lastpost_date: number
    main_post: number
    posts: number
    views: number
}

export interface IMessage {
    id: number
    threadid: number
    message: string
    author: string
    date: number
    username: string
    motto: string
    look: string
    id_auteur: number
    rank: number
}

export interface Owner {
    username: string
    look: string
}

export interface UserStats {
    respect: number
    achievement_score: number
    online_time: number
}

export interface Relation {
    username: string
}

export interface Badge {
    badge_id: string
}

export interface Group {
    id: number
    name: string
    desc: string
    badge: string
    owner_id: number
    created: number
    room_id: number
    state: number
    colour1: number
    colour2: number
    admindeco: number
    has_forum: number
}

export interface Room {
    caption: string
    owner: string
    description: string
}

export interface MailCheck {
    type: number
    email: string
    temps: number
}
