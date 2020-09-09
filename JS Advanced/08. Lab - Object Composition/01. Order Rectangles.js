orderRectangles = (rectangles = []) => {
    const rectangle = ([width, height]) => {
        const area = () => width * height;
        return {
            width,
            height,
            area,
            compareTo: (other) => other.area() - area() || other.width - width,
        };
    };

    rectangles = rectangles.map(rectangle);
    rectangles.sort((a, b) => a.compareTo(b));
    return rectangles;
};
