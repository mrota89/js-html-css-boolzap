var app = new Vue({
 el: '#app',

 data: {

  inputMessages: '',
  contactIDX: 0,
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds(),
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

    submitMessage: function(contactIndex) {
      this.contacts[contactIndex].messages.push ({
        text: this.inputMessages,
        status:'sent',
        date: `${this.day}/${this.month}/${this.year} ${this.hours}:${this.minutes}:${this.seconds}`
      });
      this.inputMessages = '';

      setTimeout(function() {
        const secondsDelay = new Date().getSeconds();
        this.contacts[contactIndex].messages.push ({
          text: 'ok',
          status:'received',
          date: `${this.day}/${this.month}/${this.year} ${this.hours}:${this.minutes}:${secondsDelay}`
        });
      }.bind(this), 1000)
    }
  }
});

Vue.config.devtools = true;
