# Resource Lifecycle

## Resource Classes
- fixed transversal: always available, protected
- module persistent: kept installed during an active milestone
- plan temporary: installed only for a bounded plan
- reference only: documented but not installed
- deferred: inventoried for later phases

## Plan Requirements
- Declare install, use, persistence, and removal for plugins, agents, and skills.
- Remove temporary resources after the plan unless explicitly promoted.
- Mark obsolete resources in inventory before deleting them from disk.

