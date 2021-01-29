const details = ({ user, data, error, path }) => {
  return `
    <section id="viewhotelDetails">
        <h2>Details</h2>
        <div class="hotel-ticket">
            <div class="hotel-left">
                <img src="${data.imageUrl}" alt="">
            </div>
            <div class="hotel-right">
                <div>
                    <h3>${data.name}</h3>
                </div>
                <div>
                    ${data.city}
                </div>
                <p><span >Free rooms: ${data.rooms}</span> </p>
                ${
                  user._id.equals(data.owner)
                    ? `<a href="/edit/${data._id}" class="edit">Edit</a>
                        <a href="/delete/${data._id}" class="remove">Delete</a>`
                    : data.booked.findIndex((hId) => hId.equals(user._id)) !== -1
                    ? `<p><span class="green">You already have booked a room</span> </p>`
                    : `<a href="/book/${data._id}" class="book">Book</a>`
                }
            </div>
        </div>
    </section>`;
};

module.exports = details;
