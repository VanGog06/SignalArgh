using Microsoft.AspNetCore.SignalR;
using SignalArgh.Models.Chat;
using System.Threading.Tasks;

namespace SignalArgh.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(ChatRowModel chatRow)
        {
            await this.Clients.All.SendAsync("messageReceived", chatRow);
        }
    }
}