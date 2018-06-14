import { connect } from 'mqtt';


export default class Mqtt {


  constructor() {
    this.client = connect('ws://test.mosquitto.org/mqtt')
    this.client.on('connect', () => {
      this.client.subscribe('presence')
      this.client.publish('presence', 'Hello mqtt')
    });
    this.client.on('message', (topic, message)=> {
          // message is Buffer
          console.log(message.toString())
          this.client.end()
        }
      )
  }


}
