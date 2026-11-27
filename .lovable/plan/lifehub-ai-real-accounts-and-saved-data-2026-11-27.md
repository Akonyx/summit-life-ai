# LifeHub AI: real accounts and saved data

## What will change
- Keep the existing purple visual style and page layout, and use the requested footer wording.
- Add an email-and-password sign-in/sign-up screen. Put the dashboard and private hubs behind sign-in, with a sign-out option.
- Replace the sample dashboard with the signed-in person's records and remove invented names, balances, streaks, tasks, and other example entries.
- Add create, view, update, and delete flows for tasks, habits, goals, money entries, and journal entries. Keep the other hubs free of invented records.
- Save records in the connected app database so they remain available after refresh and future sign-ins.

## Technical approach
- Create the requested `profiles`, `tasks`, `habits`, `goals`, `transactions`, and `journal_entries` tables with owner-only access rules; new accounts start with no sample records.
- Use the profile answer to decide which personal fields to store and how to greet the signed-in user.
- Keep private screens in an authenticated route group and retain the current URLs for the existing hubs.

## Verification
- Check the database migration and owner-only policies, then verify the sign-up/sign-in and record-saving flow where the available auth state permits.
- Review route metadata and the preview for build/runtime errors.
