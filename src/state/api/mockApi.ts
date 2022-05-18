import type {Message} from '@State/slices/Messages/types';

const mockUsersData = [
  {
    userId: '1',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5743.jpg',
    fullName: 'Eric Cartman',
    name: 'Eric',
  },
  {
    userId: '2',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5744.jpg',
    fullName: 'Stan Marsh',
    name: 'Stan',
  },
  {
    userId: '3',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5543.jpg',
    fullName: 'Kyle Broflovski',
    name: 'Kyle',
  },
  {
    userId: '4',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5241.jpg',
    fullName: 'Kenny McCormick',
    name: 'Kenny',
  },
  {
    userId: '5',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5244.jpg',
    fullName: 'Butters Stotch',
    name: 'Butters',
  },
  {
    userId: '6',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5147.jpg',
    fullName: 'Jimmy Valmer',
    name: 'Jimmy',
  },
  {
    userId: '7',
    avatar: 'https://faces-img.xcdn.link/image-lorem-face-5149.jpg',
    fullName: 'Clyde Donovan',
    name: 'Clyde',
  },
];

interface MockDataShape<P> {
  data: P;
}

const mockApiCall = async <P>(
  content: P,
  delay = 2000,
): Promise<MockDataShape<P>> => {
  try {
    // const res = await api.post("/update-profile", form);
    // return res;
    return new Promise((res, rej) => {
      setTimeout(() => res({data: content}), delay);
    });
  } catch (err) {
    throw new Error('error.unknown');
  }
};

const fetchChannels = () =>
  mockApiCall({
    channels: [
      {
        name: 'lowKey squad',
        channelId: '1',
        members: ['1', '2', '3', '4', '5', '6'],
        onlineMembers: 1,
      },
    ],
  });

const fetchChannelMessages = (id: string) =>
  mockApiCall<Message[]>([
    {
      messageId: '1',
      channelId: id,
      author: '1',
      type: 'text',
      message: {content: 'Heyy'},
    },
    {
      messageId: '2',
      channelId: id,
      author: '2',
      type: 'text',
      message: {content: 'whatsup'},
    },
    {
      messageId: '3',
      channelId: id,
      author: '2',
      type: 'text',
      message: {
        content:
          'Nice! 12 ppl in total. Let’s gather at the metro station!🚆🚆🚆. Nice! 12 ppl in total. Let’s gather at the metro station!🚆🚆🚆',
      },
    },
    {
      messageId: '4',
      channelId: id,
      author: '3',
      type: 'text',
      message: {content: 'Heyy guys'},
    },
    {
      messageId: '5',
      channelId: id,
      author: '1',
      type: 'text',
      message: {content: 'I am good thanks'},
    },
  ]);

const fetchCurrentUser = () =>
  mockApiCall({
    user: {
      userId: '3',
      avatar: 'https://faces-img.xcdn.link/image-lorem-face-5543.jpg',
      fullName: 'Kyle Broflovski',
      name: 'Kyle',
    },
  });

const fetchChannelMembers = (id: string) => mockApiCall(mockUsersData);

const API = {
  fetchChannels,
  fetchChannelMessages,
  fetchCurrentUser,
  fetchChannelMembers,
};

export default API;
