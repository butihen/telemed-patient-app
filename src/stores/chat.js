import { defineStore } from 'pinia'

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    chats: [],
    currentChatId: null,
    chatListDrawer: true,
    search: '',
    unsubscribe: null,
  }),

  getters: {
    activeChat: state => state.chats.find(chat => chat.uid === state.currentChatId),
    messages: state => state.activeChat ? state.activeChat.messages : [],
    activeChatTitle: state => {
      if(!state.activeChat) return ''

      const user = JSON.parse(localStorage.getItem('user'))

      const otherUsers = state.activeChat ? state.activeChat.users.filter(u => u.uid != user.uid).map(u => u.name) : []

      return otherUsers.length > 0 ? otherUsers.join(', ') : user.displayName
    },
    computedChats: state => {
      // filter the chats based on the users name
      if(!state.search || state.search == '') return state.chats

      return state.chats.filter(chat => {
        return chat.users.filter(u => u.name.toLowerCase().includes(state.search.toLowerCase())).length > 0
      })
    },
  },

  actions: {
    getTitle(chat) {
      const user = JSON.parse(localStorage.getItem('user'))

      const otherUsers = chat.users.filter(u => u.uid != user.uid).map(u => u.name)

      return otherUsers.length > 0 ? otherUsers.join(', ') : user.displayName
    },
  },
})
