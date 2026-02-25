import MessageBroker, { MessageBrokerInterface } from '@risatesole/messagebroker';
import discordadapter from '@risatesole/discordadapter';

const messagebroker: MessageBrokerInterface = new MessageBroker();
const discord = new discordadapter(messagebroker);

discord.hello();
discord.run();
