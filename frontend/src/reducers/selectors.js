export const asArray = ({ goals }) => {
    return Object.keys(goals).map(key => goals[key])
}