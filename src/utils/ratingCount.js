const avgRating = (input) => {
    let rating = 0;
    
    for (var i = 0; i < input.length; i++) {
        const number = parseFloat(input[i].rating)
        rating += number;
    }

    const avg = rating/input.length;

    return avg;
};

module.exports = { avgRating };
  