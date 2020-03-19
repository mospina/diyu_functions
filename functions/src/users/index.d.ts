declare namespace User {
  type Profile = {
    name: string
  }

  type AccountType = 'FREE' | 'BASIC' | 'OPEN' 

  type Status = 'NEW' | 'ACTIVE' | 'INACTIVE'

  type Account = {
    type: AccountType,
    status: Status
  }

  type User = {
    id: string,
    profile: Profile,
    account: Account
  }
}
