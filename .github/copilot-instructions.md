# Repository Instructions

Review all pull requests with the following priorities:

## React

- Prefer functional components.
- Avoid unnecessary re-renders.
- Use React.memo only when justified.
- Keep hooks at the top level.
- Prefer custom hooks for reusable logic.

## TypeScript

- Avoid any.
- Prefer explicit interfaces.
- Use readonly where appropriate.

## Accessibility

- Buttons require accessible names.
- Inputs require labels.
- Images require alt text.

## Performance

- Watch for unnecessary useEffect calls.
- Recommend lazy loading where appropriate.
- Flag expensive computations inside render.

## Security

- No secrets in code.
- Validate user input.
- Avoid unsafe HTML rendering.

## Code Style

- Small components.
- Meaningful variable names.
- Remove dead code.
- Prefer early returns.