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
        messages: [{
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
        messages: [{
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
        messages: [{
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
        messages: [{
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

    //ritorna stringa del percorso file immagine
    imageContact: function(index) {
      const profileImage = this.contacts[index].avatar;
      const imageString = `images/avatar${profileImage}.jpg`;
      return imageString;
    },

    //ritorna stringa con classe CSS per colore messaggo inviato/ricevuto
    statusMessageClass: function(messageIndex) {
      const currentMessage = this.contacts[this.contactIDX].messages;
      const statusMessage = currentMessage[messageIndex].status;
      const classString = `${statusMessage}`;
      return classString;
    },

    //ritorna il valore di contactIDX uguale a quello del contatto cliccato (lista contatti)
    changeContact: function(indexClickedContact) {
      this.contactIDX = indexClickedContact;
    },

    //ritorna una stringa di classi CSS diversa a seconda se il contatto è selezionato o meno
    selectedContact: function(indexSelectedContact) {
      const selected = 'contact active flex';
      const notSelected = 'contact flex';
      if (indexSelectedContact === this.contactIDX) {
        return selected;
      } else {
        return notSelected;
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

    //per renderizzare data e ora di ultimo accesso del contatto
    renderDate: function(timeToRender) {
      let date = timeToRender.slice(0, 10);
      let time = timeToRender.slice(11, 16);
      let lastAccessTime = `${date} alle ${time}`;
      return lastAccessTime;
    },

    //l'ultimo accesso del contatto si basa sulla data dell'ultimo messaggio "inviato" dallo stesso
    lastAccess: function(contactIndex) {
      const messages = this.contacts[contactIndex].messages
      let lastMessageDate;

      //filtro in un array i messaggi con status === received
      const receivedMessage = messages.filter((element) => {
        return element.status === 'received';
      });

      /*per ogni messaggio di receivedMessage estrapolo la proprietà date,
      e assegno a lastMessageDate solo la proprietà date dell'ultimo messaggio dell'array*/
      receivedMessage.forEach((element, index) => {
        const { date } = element;
        if (index === receivedMessage.length - 1) {
          lastMessageDate = element.date;
        }
      })
      return this.renderDate(lastMessageDate);
    },

    botReply: function() {
      this.contacts[this.contactIDX].messages.push({
        text: 'ok',
        status: 'received',
        date: `${this.currentDate()} ${this.currentClock()}`
      })
    },

    submitMessage: function() {
      this.contacts[this.contactIDX].messages.push({
        text: this.inputMessages,
        status: 'sent',
        date: `${this.currentDate()} ${this.currentDate()}`
      });
      this.inputMessages = '';

      let that = this;
      setTimeout(function() {
        that.botReply()
      }, 1000)
    },

    /*sostituisce il booleano della proprietà visible del contatto
    a seconda del valore assunto dalla variabile flag*/
    searchContactFunction: function() {
      let flag = false;
      this.contacts.forEach((contact) => {
        const { name, visible } = contact;
        flag = name.toLowerCase().startsWith(this.searchContact.toLowerCase());
        if (flag) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      })
    }
  } //end methods
}); // end vue app

Vue.config.devtools = true;
