<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use App\Mail\CommentReplyNotification;
use Illuminate\Http\Request;

use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    /*
     * Create new comment
     *
     * @param Request $request Comment data
     * @return Response
     */
    public function create(Request $request): Response
    {
        $rules = [
            'comment' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $messages = $validator->messages();
            return response([
                'error' => $messages
            ], 400);
        } else {
            // Create comment
            Comment::create([
                'comment' => $request->comment,
                'user_id' => Auth::user()->id,
                'question_id' => $request->question_id,
                'date' => time(),
                'reply' => $request->reply ? 1 : NULL,
                'reply_to' => $request->reply_to ? $request->reply_to : NULL,
            ]);
            if($request->reply_to){
                $reply_user = new Comment();
                $reply_user = $reply_user->findOrFail($request->reply_to)->user;
                Mail::to($reply_user)->send(new CommentReplyNotification($reply_user));
            }
            return response([
                'success' => true
            ], 201);
        }
    }

    /*
     * Get comments by question id
     *
     * @param int $question_id Question id
     */
    public function getToQuestion($question_id)
    {
        $comments = Comment::where('reply', NULL)->where('question_id', $question_id)->with('user')->get();
        foreach ($comments as $k => $v) {
            $comments[$k]['replies'] = Comment::where('reply', 1)->where('reply_to', $v['id'])->with('user')->get();
        }
        return $comments;
    }
}
