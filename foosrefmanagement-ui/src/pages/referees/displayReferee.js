export const displayRefereeName = (referee) => {
    return `${referee.last_name} ${referee.first_name}`;  
};

export const displayRefereeWithRankShort = (referee) => {
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