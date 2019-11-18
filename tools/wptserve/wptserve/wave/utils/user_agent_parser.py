from __future__ import absolute_import
from ua_parser import user_agent_parser


def parse_user_agent(user_agent_string):
    user_agent = user_agent_parser.ParseUserAgent(user_agent_string)

    name = user_agent[u"family"]
    version = u"0"

    if user_agent[u"major"] is not None:
        version = user_agent[u"major"]

    if user_agent[u"minor"] is not None:
        version = version + u"." + user_agent[u"minor"]

    if user_agent[u"patch"] is not None:
        version = version + u"." + user_agent[u"patch"]

    return {
        u"name": name,
        u"version": version
    }
