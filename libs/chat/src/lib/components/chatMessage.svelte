<script lang="ts">
	import type { ChatMessageType } from '../types';

	export let messagesData: ChatMessageType[];

	const event = new Date();
</script>

{#each messagesData as message}
	<div class="chat_message">
		<div class="message_head">
			<a href={message.userLink} class="head-link"
				><img class="avatar" src={message.avatar} alt="user icon" />
			</a>
		</div>
		<div class="message_content">
			<div class="title">
				<div class="name">
					<a href={message.userLink} class=""><span>{message.username}</span></a>
					<div class="time">{event.toLocaleTimeString()}</div>
				</div>
			</div>
			<div class="msg-wrap">
				<div class="normal-msg">
					{#if message.messageGif}
						<div class="msg-gif">
							<img src={message.messageGif} alt="user icon" />
						</div>
					{:else}
						{message.messageText}
					{/if}
				</div>
			</div>
		</div>
	</div>
{/each}

<style lang="postcss">
	.chat_message {
		@apply flex flex-row break-words;
	}
	.chat_message .message_head {
		@apply w-10 pt-3;
	}
	.chat_message .message_head .head-link {
		@apply block relative no-underline;
	}
	.chat_message .message_head .head-link .avatar {
		@apply rounded-full w-10 h-10 m-0 block;
	}
	.chat_message .message_content {
		@apply pt-3 flex-1 pl-2 pb-2 overflow-hidden;
	}
	.chat_message .message_content .title {
		@apply flex h-4 mb-2 items-center justify-between;
	}
	.chat_message .message_content .title .name {
		@apply flex items-center h-full;
	}
	.chat_message .message_content .title .name a {
		@apply flex items-center h-full leading-5 font-semibold justify-start no-underline;
	}
	.chat_message .message_content .title .name .time {
		@apply flex items-center h-full self-end ml-2 text-xs;
	}
	.chat_message .message_content .msg-wrap {
		@apply flex relative;
	}
	.chat_message .message_content .msg-wrap .normal-msg {
		@apply text-xs p-3 bg-primary-700 rounded w-full;
	}
</style>
