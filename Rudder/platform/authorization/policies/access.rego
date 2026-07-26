# OPA/Rego policy skeleton for Rudder authorization.
# Input contract:
#   input.subject  — { sub, org_id, roles[], amr[], amr_age_seconds }
#   input.action   — permission id, e.g. "users:invite"
#   input.resource — { type, id, org_id, owner_id? }

package rudder.authz

import future.keywords.if
import future.keywords.in

default allow := false

# Allow when the subject holds a role that grants the required permission
# and the resource belongs to the active organization.
allow if {
	resource_in_org
	some role in input.subject.roles
	permission_granted(role, input.action)
	not requires_step_up
}

allow if {
	resource_in_org
	some role in input.subject.roles
	permission_granted(role, input.action)
	requires_step_up
	step_up_satisfied
}

resource_in_org if {
	input.resource.org_id == input.subject.org_id
}

permission_granted(role, action) if {
	# Role → permission bindings are loaded as data.rudder.rbac.roles
	action in data.rudder.rbac.roles[role].permissions
}

requires_step_up if {
	input.action in data.rudder.authn.step_up_actions
}

step_up_satisfied if {
	"otp" in input.subject.amr
	input.subject.amr_age_seconds <= data.rudder.authn.max_amr_age_seconds
}

step_up_satisfied if {
	"webauthn" in input.subject.amr
	input.subject.amr_age_seconds <= data.rudder.authn.max_amr_age_seconds
}
