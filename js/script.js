var app = new Vue({
 el: '#app',

 data: {
  inputMessages: '',
  searchContact: '',
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

    currentDate: function() {
      const date = new Date();
      let day = this.addZero(date.getDate());
      let month = this.addZero(date.getMonth() + 1);
      let year = date.getFullYear();
      let today = `${day}/${month}/${year}`;
      return today
    },

    currentClock: function() {
      const date = new Date();
      let seconds = this.addZero(date.getSeconds());
      let minutes = this.addZero(date.getMinutes());
      let hours = this.addZero(date.getHours());
      let time = `${hours}:${minutes}:${seconds}`;
      return time
    },

    renderDate: function(timeToRender) {
      let date = timeToRender.slice(0, 10);
      let time = timeToRender.slice(11, 16);
      let lastAccessTime = `${date} alle ${time}`;
      return lastAccessTime;
    },

    botReply: function() {
       this.contacts[this.contactIDX].messages.push ({
        text: 'ok',
        status:'received',
        date: `${this.currentDate()} ${this.currentClock()}`
      })
    },

    submitMessage: function() {
      this.contacts[this.contactIDX].messages.push ({
        text: this.inputMessages,
        status:'sent',
        date: `${this.currentDate()} ${this.currentDate()}`
      });
      this.inputMessages = '';

      let that = this;
      setTimeout(function() {
        that.botReply()
      }, 1000)
    },

    //l'ultimo accesso del contatto si basa sulla data dell'ultimo messaggio inviato dallo stesso
    lastAccess: function(contactIndex) {
      const messages = this.contacts[contactIndex].messages
      let lastMessageDate;

      const receivedMessage = messages.filter ((element) => {
        return element.status === 'received'
      });

      receivedMessage.forEach((element, index) => {
        let {date} = element;
        if(index === receivedMessage.length - 1) {
          return lastMessageDate = element.date;
        }
      })
      return this.renderDate(lastMessageDate);
    },

    searchFunction: function() {
      let flag = false;
      this.contacts.forEach((contact) => {
        let {name, visible} = contact;
        flag = name.toLowerCase().startsWith(this.searchContact.toLowerCase());
        if(flag) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      })
    }
  }//end methods
});// end vue app

Vue.config.devtools = true;
