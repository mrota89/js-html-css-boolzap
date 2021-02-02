var app = new Vue({
 el: '#app',

 data: {
  messageTime: '',
  inputMessages: '',
  contactIDX: 0,
  contacts: [

   	{
   		name: 'Michele',
   		avatar: '_1',
   		visible: true,
   		messages: [
   			{
   				date: '10/01/2020 15:30:55',
   				text: 'Hai portato a spasso il cane?',
   				status: 'sent'
   			},
   			{
   				date: '10/01/2020 15:50:00',
   				text: 'Ricordati di dargli da mangiare',
   				status: 'sent'
   			},
   			{
   				date: '10/01/2020 16:15:22',
   				text: 'Tutto fatto!',
   				status: 'received'
   			}
   		],
   	},

   	{
   		name: 'Fabio',
   		avatar: '_2',
   		visible: true,
   		messages: [
   			{
   				date: '20/03/2020 16:30:00',
   				text: 'Ciao come stai?',
   				status: 'sent'
   			},
   			{
   				date: '20/03/2020 16:30:55',
   				text: 'Bene grazie! Stasera ci vediamo?',
   				status: 'received'
   			},
   			{
   				date: '20/03/2020 16:35:00',
   				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
   				status: 'sent'
   			}
   		],
   	},

   	{
   		name: 'Samuele',
   		avatar: '_3',
   		visible: true,
   		messages: [
   			{
   				date: '28/03/2020 10:10:40',
   				text: 'La Marianna va in campagna',
   				status: 'received'
   			},
   			{
   				date: '28/03/2020 10:20:10',
   				text: 'Sicuro di non aver sbagliato chat?',
   				status: 'sent'
   			},
   			{
   				date: '28/03/2020 16:15:22',
   				text: 'Ah scusa!',
   				status: 'received'
   			}
   		],
   	},

   	{
   		name: 'Luisa',
   		avatar: '_4',
   		visible: true,
   		messages: [
   			{
   				date: '10/01/2020 15:30:55',
   				text: 'Lo sai che ha aperto una nuova pizzeria?',
   				status: 'sent'
   			},
   			{
   				date: '10/01/2020 15:50:00',
   				text: 'Si, ma preferirei andare al cinema',
   				status: 'received'
   			}
   		],
   	}
   ]
 },

 methods: {
   
    imageContact: function(index) {
      return `images/avatar${this.contacts[index].avatar}.jpg`
    },

    statusMessage: function(contactIndex, mexIndex) {
      return `${this.contacts[contactIndex].messages[mexIndex].status}`
    },

    changeContact: function(indexClickedContact) {
      return this.contactIDX = indexClickedContact
    },

    selectedContact: function(indexSelectedContact) {
      if(indexSelectedContact === this.contactIDX) {
        return 'contact active flex'
      } else {
        return 'contact flex'
      }
    },

    addZero: function(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },

    date: function() {
      const date = new Date();
      const day = this.addZero(date.getDate());
      const month = this.addZero(date.getMonth() + 1);
      const year = this.addZero(date.getFullYear());
      const today = `${day}/${month}/${year}`;
      return today
    },

    clock: function() {
      const date = new Date();
      const seconds = this.addZero(date.getSeconds());
      const minutes = this.addZero(date.getMinutes());
      const hours = this.addZero(date.getHours());
      const time = `${hours}:${minutes}:${seconds}`;
      return time
    },

    submitMessage: function(contactIndex) {
      this.contacts[contactIndex].messages.push ({
        text: this.inputMessages,
        status:'sent',
        date: `${this.date()} ${this.clock()}`
      });
      this.inputMessages = '';

      setTimeout(function() {
        this.contacts[contactIndex].messages.push ({
          text: 'ok',
          status:'received',
          date: `${this.date()} ${this.clock()}`
        });
      }.bind(this), 1000)
    },

    lastAccess: function(contactIndex) {
      const indexMex = this.contacts[contactIndex].messages.length - 1;
      const lastMessage = this.contacts[contactIndex].messages[indexMex];
      const messageTime = lastMessage.date;
      const date = messageTime.slice(0, 10);
      const time = messageTime.slice(11, 16);
      return `${date} alle ${time}`
    }
  }
});

Vue.config.devtools = true;
