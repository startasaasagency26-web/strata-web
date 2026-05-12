CREATE TYPE lead_status AS ENUM ('new','contacted','qualified','discovery_scheduled','proposal_sent','negotiating','won','lost','unresponsive');
CREATE TYPE lead_priority AS ENUM ('hot','warm','cold');
CREATE TYPE crm_role AS ENUM ('admin','manager');
CREATE TYPE crm_user_status AS ENUM ('active','invited','disabled');
CREATE TYPE note_type AS ENUM ('general','call','whatsapp','email','follow_up','system');
CREATE TYPE follow_up_status AS ENUM ('pending','completed','cancelled','overdue');
CREATE TYPE contact_method AS ENUM ('whatsapp','email','call');
