import groups from "../groups.json"
import {GetGroupsResponse} from "../dataInterface";

export const getFilteredGroups = (selectedClosed: string, selectedColor: string, selectedFriends: string): Promise<GetGroupsResponse> => {
    console.log(selectedClosed, selectedColor, selectedFriends)
    let result: 1 | 0 = 0;
    let data = groups;
    console.log(data)

    let filteredGroups = groups.filter(function(group) {
        console.log(group.closed, group.avatar_color, !!group.friends);
        if (selectedClosed === "Открытая" && group.closed) {
            console.log("не прошла по закрытости")
            return false;
        }
        if (selectedClosed === "Закрытая" && !group.closed) {
            console.log("не прошла по закрытости")
            return false;
        }
        if (selectedColor !== "" && group.avatar_color !== selectedColor) {
            console.log("не прошла по цвету")
            return false;
        }
        if (selectedFriends === "Есть друзья" && (!group.friends || group.friends.length === 0)) {
            console.log("не прошла по друзьям")
            return false;
        }
        if (selectedFriends === "Нет друзей" && group.friends && group.friends.length > 0) {
            console.log("не прошла по друзьям")
            return false;
        }
        return true;
    });
    console.log(filteredGroups);
    data = filteredGroups;
    return new Promise<GetGroupsResponse>((resolve) => {
        setTimeout(() => {
            resolve({result, data});
        }, 1000);
    });
};

export const getAllGroups = () => {
    return new Promise<GetGroupsResponse>((resolve) => {
        let result: 1 | 0 = 0;
        let data = groups;
        setTimeout(() => {
            resolve({result, data});
        }, 1000);
    });
}


