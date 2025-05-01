import './organizationList.css'
import {useState, useEffect, useRef, useCallback} from "react";
import {useNavigate} from "react-router-dom";



interface Organization {
    organizationId: number;
    name: string;
}

function OrganizationList() {
    const [org, setOrg] = useState<Organization[]>([]);

    const navigate = useNavigate();
    const didFetchRef = useRef(false);

    useEffect(() => {
        if (!didFetchRef.current) {
            didFetchRef.current = true;
            loadOrganizationList()
        }

    }, []);

    const loadOrganizationList = async () => {
        let path = "/orgs";
        const res = await fetch(process.env.REACT_APP_REST_API_URL + path);
        const json = await res.json();
        console.log(json);
        setOrg(json);
    }

    const handleEditOrgBtn = async (org: Organization) => {
        navigate("/userList", {state: {organizationId: org.organizationId, name: org.name}});
    }
    return (
        <div className="organization-list">
            {org.map((org) => (
            <div className="organization-list-item" key={org.organizationId}>
                <p className={"organization-list-text"}>{org.name}</p>
                <button onClick={() => handleEditOrgBtn(org)} className={"organization-list-button"} type={"button"}>Edit Organizations</button>
            </div>
            ))}
        </div>
    );
}
export default OrganizationList;
