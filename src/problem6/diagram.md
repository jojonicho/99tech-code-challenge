@startuml
title Flow of Execution - Live Scoreboard

actor User as U
actor MaliciousUser as MU

participant "Frontend" as FE
participant "Backend" as BE
participant "Authentication Service" as Auth
participant "Database" as DB

group User Action
U -> FE: Auth-protected website features (for now only activities that increment points)
activate FE
FE -> Auth: Authenticate user (token/session)
activate Auth
Auth -> FE: Return authentication status
deactivate Auth
end

group Update Score
FE -> BE: Dispatch API call to update score (with user ID and score increment)
activate BE
BE -> Auth: Check JWT session_token validity and expiry
Auth -> BE: Return validation status
alt Valid API Call
BE -> DB: Update user score
activate DB
DB -> BE: Confirm score update
deactivate DB
BE -> FE: Response with updated score
deactivate BE
else Invalid API Call
BE -> FE: Reject request (unauthorized)
deactivate FE
FE -> U: Page displays successful/unsuccessful point addition
end
end

loop Live Score Updates
U -> FE: Visits scoreboard page
activate FE
FE -> BE: scoreboard service API call
activate BE
BE -> DB: Fetch top 10 user with highest scores
activate DB
DB -> BE: Return top 10 user scores
deactivate DB
BE -> FE: Push updated scoreboard (Automatically updated for everyone on the page with the feat of Websockets)
deactivate BE
FE -> U: Displays updated scoreboard (should there be any changes to the standing)
deactivate FE
end

alt Malicious Activity
MU -> BE: Attempt to update score (without valid authentication)
activate BE
BE -> Auth: Check JWT session_token validity and expiry
activate Auth
Auth -> BE: Reject invalid token
deactivate Auth
BE -> MU: Reject request (unauthorized)
deactivate BE
end
@enduml
