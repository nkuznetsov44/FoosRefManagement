export const displayRefereeShort = (referee) => {
    // TODO: make in icon for each rank
    const shortRankDisplayLookup = {
        'ASSISTANT': "Asst",
        'REGIONAL': "Reg",
        'NATIONAL': "Nat",
        'INTERNATIONAL': "Int"
    };
    return (
        referee &&
        `${referee.first_name} ${referee.last_name} (${shortRankDisplayLookup[referee.rank]})`
    );
};