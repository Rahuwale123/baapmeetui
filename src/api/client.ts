export interface ApiResponse<T> {
  data: T;
}

export interface AuthApi {
  login: (input: { identifier: string; password: string }) => Promise<ApiResponse<{ token: string }>>;
  signup: (input: {
    firstName: string;
    lastName: string;
    gender: string;
    contact: string;
    password: string;
  }) => Promise<ApiResponse<{ token: string }>>;
  me: () => Promise<ApiResponse<{ name: string; roomName: string }>>;
}

export interface MeetingsApi {
  list: () => Promise<ApiResponse<unknown>>;
  get: (id: string) => Promise<ApiResponse<unknown>>;
  create: (input: Record<string, unknown>) => Promise<ApiResponse<{ id: string }>>;
}

export interface ProfileApi {
  get: () => Promise<ApiResponse<Record<string, unknown>>>;
  update: (input: Record<string, unknown>) => Promise<ApiResponse<Record<string, unknown>>>;
}

export interface RoomsApi {
  join: (roomName: string) => Promise<ApiResponse<{ url: string }>>;
}

export interface BaapConnectApi {
  auth: AuthApi;
  meetings: MeetingsApi;
  profile: ProfileApi;
  rooms: RoomsApi;
}

export const apiClient: BaapConnectApi = {
  auth: {
    async login(input) {
      console.info("Mock login", input);
      return { data: { token: "mock-token" } };
    },
    async signup(input) {
      console.info("Mock signup", input);
      return { data: { token: "mock-token" } };
    },
    async me() {
      return { data: { name: "Disha Sharma", roomName: "disha-room" } };
    }
  },
  meetings: {
    async list() {
      return { data: [] };
    },
    async get(id) {
      return { data: { id } };
    },
    async create(input) {
      console.info("Mock create meeting", input);
      return { data: { id: "mock-meeting" } };
    }
  },
  profile: {
    async get() {
      return { data: {} };
    },
    async update(input) {
      console.info("Mock profile update", input);
      return { data: input };
    }
  },
  rooms: {
    async join(roomName) {
      return { data: { url: `/meeting/${roomName}` } };
    }
  }
};
