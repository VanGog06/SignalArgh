using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalArgh.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string date, string message)
        {
            await this.Clients.All.SendAsync("messageReceived", date, message);
        }
    }
}
