# Global Context Providers Branch

This branch has files for creating/managing global state using React's Context API. These wrap the root component (app) in main so data's available everywhere without passing props manually (prop drilling). Essentially you can give data to great grandchildren components without having to pass it through each child

## Provider files

- AuthProvider: uses createContext hook to share data like login status across the app
- ThemeProvider: Provide global themes throughout the app
